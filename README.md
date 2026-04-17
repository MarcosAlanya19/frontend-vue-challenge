# Documentación Técnica - Kambista Frontend Vue

## Instrucciones de ejecución

Acceso rápido al despliegue: https://kambista.netlify.app/

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview de producción
npm run preview

```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NUXT_PUBLIC_API_BASE_URL` | URL base de la API de Kambista |

Copiar `.env.example` a `.env` y configurar las variables:

```bash
cp .env.example .env
```

## Credenciales de prueba

### Login directo
| Campo | Valor |
|-------|-------|
| Email | `marcos@gmail.com` |
| Contraseña | `123456` |

### Registro de nuevo usuario
Al completar el onboarding, el sistema genera las credenciales automáticamente:

| Campo | Valor |
|-------|-------|
| Email | `{nombre}@kambista.com` (ej: "Juan Perez" → `juan@kambista.com`) |
| Contraseña | `123456` |

> Una vez registrado, usar estas credenciales para iniciar sesión desde la pantalla de login.

### Cerrar sesión

Desde el sidebar (layout principal) se puede cerrar sesión en cualquier momento.

## Arquitectura del proyecto

```
app/
├── assets/css/             # Tailwind CSS entry point
├── components/
│   ├── form/               # Componentes de formulario reutilizables
│   ├── icons/              # SVGs como componentes Vue
│   └── ui/                 # Componentes UI base
├── enums/                  # Enumeraciones globales (ECurrency)
├── layouts/                # Layouts (auth, main, onboarding, transaction)
├── lib/                    # Utilidades (axios, date, currency, cn, storage)
├── middleware/             # Guards de navegación (auth, guest)
├── modules/
│   ├── auth/               # Login: componentes, servicios, schemas
│   ├── calculator/         # Calculadora: componentes, composables, servicios
│   ├── onboarding/         # Registro: componentes, servicios, schemas
│   └── transaction/        # Operaciones: componentes, composables, servicios
├── pages/                  # Rutas file-based de Nuxt
├── plugins/                # Inicialización de sesión y librerías
├── stores/                 # Estado global con Pinia
├── types/                  # Tipos compartidos (APIError, etc.)
└── app.vue
```

### Flujo de navegación

```
/login  (guest)
  |
  +-- /onboarding/personal-data  →  /onboarding/success
  |                                          |
  +------------------------------------------+
  |
  /  (home - calculadora)
  |
  +-- /transaction/create
        |
        +-- /transaction/transfer
              |
              +-- /transaction/receipt
                    |
                    +-- /transaction/success  →  /
```

### Flujo de transacción

```
/transaction/create      →  Selección de bancos, origen de fondos y cuenta destino
/transaction/transfer    →  Datos de cuenta Kambista para transferir
/transaction/receipt     →  Adjuntar voucher de depósito
/transaction/success     →  Resumen de la operación creada
```

El layout `transaction.vue` envuelve todas las pantallas del flujo con un stepper compartido. El estado de la operación persiste en `useTransactionStore` entre pasos.

### Capas de un módulo

Cada módulo dentro de `modules/` sigue la misma estructura interna:

```
modules/<nombre>/
  components/        # Componentes de presentación del módulo
  composables/       # Composables que conectan servicios con el estado
  containers/        # Componentes con lógica de negocio
  services/          # Llamadas HTTP o mocks (*.services.ts)
  constants/         # Constantes propias del módulo
  types/             # Interfaces y tipos del módulo
  enums/             # Enumeraciones del módulo
  lib/               # Funciones puras de lógica de negocio
```

### Patrón de formulario

Todos los formularios siguen el mismo patrón:

1. `index.schema.ts` define el schema Zod y el tipo inferido
2. El componente instancia `useForm` con `toTypedSchema(zodSchema)` de `@vee-validate/zod`
3. Los componentes `Form*` (FormInput, FormPickerInput, etc.) usan `useField()` internamente — no reciben `register` ni `control` como props
4. Las validaciones cross-field (ej: formato de documento según tipo) se implementan con `superRefine` + `watch` para re-validación reactiva

### Patrón de composable

Todos los composables de datos siguen la misma firma:

```typescript
const { data, isLoading, handle } = useGetBankAccounts()
// handle: () => Promise<void>
```

Los servicios reciben siempre `{ payload }` o `{ params }`, nunca argumentos sueltos.

## Decisiones técnicas

### Estado global con Pinia

Se eligió Pinia como solución de estado por su integración nativa con Nuxt 4 y Vue 3.

| Store | Responsabilidad |
|-------|----------------|
| `useAuthStore` | Sesión del usuario, persistencia con cookie + localStorage |
| `useTransactionStore` | Resumen de operación, cuentas bancarias, selecciones del flujo |
| `useErrorStore` | Estado de errores API para el ErrorBottomSheet global |
| `useKoinsStore` | Puntos de fidelidad por usuario, persistencia en localStorage |

### Autenticación SSR-compatible

La sesión se persiste tanto en **cookie** (disponible en servidor) como en **localStorage** (respaldo en cliente):

- Al hacer login → `useCookie` + `localStorage`
- En SSR → el middleware lee la cookie → no redirige si está autenticado
- Al recargar → el servidor tiene el estado correcto desde la primera request

Esto elimina el flash de redirección al recargar páginas protegidas.

### Formularios con Vee-Validate + Zod

Cada formulario tiene su `index.schema.ts` colocado junto al componente:

- Validación en tiempo real con mensajes en español
- `required_error` en Zod para cubrir valores `undefined` (campo no tocado)
- `.min(1, ...)` para cubrir strings vacíos
- `.superRefine()` para validaciones cross-field (ej: número de documento según DNI/CE/PASAPORTE)
- `watch` sobre `documentType` para re-validar `documentNumber` reactivamente al cambiar el tipo

### Manejo de errores

- **Formularios**: validación en tiempo real con mensajes específicos por campo
- **API**: `ErrorBottomSheet` global montado en `app.vue` que se activa desde cualquier composable fallido via `useErrorStore`
- **Errores tipados**: interfaz `APIError` con `name`, `title`, `message`

```typescript
interface APIError {
  success: false
  data: {
    name: string   // 'INVALID_CREDENTIALS' | 'DUPLICATE_DNI' | 'SERVER_ERROR'
    title: string
    message: string
  }
}
```

### Servicios mock vs reales

| Servicio | Tipo | Detalle |
|----------|------|---------|
| Exchange rate | Real | `api.kambista.com/v1/exchange/kambista/current` |
| Calculadora | Real | `api.kambista.com/v1/exchange/calculates` |
| Login | Mock | Verifica credenciales contra `SEED_USERS` + localStorage |
| Registro | Mock | Valida duplicados (DNI, email, teléfono) contra datos en localStorage |
| Bancos | Mock | `mocks/bankAccounts.json` — 14 bancos peruanos |
| Origen de fondos | Mock | `mocks/sourceFunds.json` — 6 tipos de origen |
| Crear transacción | Mock | Genera `transactionId` con timestamp |
| Submit voucher | Mock | Navega a `/transaction/success` |

### CSS y estilos

- Tema centralizado en `tailwind.config.ts` (colores, tipografía, espaciado, bordes)
- Fuente Montserrat (400/500/600/700) via `@nuxtjs/google-fonts`
- Componente `UiBaseText` como wrapper que mapea `size`, `weight` y `color` a clases de Tailwind
- `@nuxtjs/tailwindcss` como único punto de inyección de CSS (evita FOUC por doble carga)

### Koins (puntos de fidelidad)

- Cada operación exitosa suma puntos calculados en base al monto de la transacción
- Los puntos se persisten en `localStorage` con clave `koins_{email}` — son por usuario
- Se cargan automáticamente al iniciar sesión via `watch(() => authStore.user, load)`

## Componentes reutilizables

### Form layer (`app/components/form/`)
| Componente | Descripción |
|-----------|-------------|
| `FormInput` | Input de texto con validación, soporte para `formatter` |
| `FormPickerInput` | Selector con wheel picker (bottom sheet) |
| `FormDateInput` | Input de fecha con DatePicker (v-calendar) |
| `FormSelect` | Select nativo con opciones |
| `FormCheckbox` | Checkbox con slot para label personalizado |
| `FormFileUpload` | Upload de archivo con preview |

### UI layer (`app/components/ui/`)
| Componente | Descripción |
|-----------|-------------|
| `UiBaseButton` | Botón primario con estado disabled |
| `UiBaseInput` | Input base con label, error y soporte password |
| `UiBaseText` | Texto con variantes de size, weight y color |
| `UiBaseBottomSheet` | Bottom sheet con backdrop y animación |
| `UiBaseHighlight` | Banner informativo con variantes (info, warning) |
| `UiBaseWheelPicker` | Selector tipo rueda para mobile |
| `UiErrorBottomSheet` | Bottom sheet global para errores de API |

## Librerías principales

| Librería | Uso |
|----------|-----|
| `nuxt@4` | Framework SSR con file-based routing |
| `vue@3` + `vue-router@4` | Reactividad y navegación |
| `pinia` + `@pinia/nuxt` | Estado global |
| `vee-validate` + `@vee-validate/zod` | Formularios y validación |
| `zod` | Schema validation y tipos inferidos |
| `@nuxtjs/tailwindcss` | Estilos utility-first |
| `axios` | Cliente HTTP |
| `dayjs` | Manipulación de fechas |
| `currency.js` | Formateo de moneda |
| `v-calendar` | Date picker |
| `@nuxt/icon` | Iconos (Lucide) |
| `@vueuse/core` | Composables utilitarios |
| `clsx` + `tailwind-merge` | Composición de clases CSS |
