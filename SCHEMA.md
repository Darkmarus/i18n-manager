schema dir

```
src/
├── assets/                    # Recursos estáticos
│   ├── images/               # Imágenes
│   │   └── svelte.svg
│   └── styles/              # Estilos globales
│       └── app.css
├── components/               # Componentes de UI reutilizables
│   ├── core/                # Componentes básicos
│   │   ├── Button.svelte
│   │   ├── Badge.svelte
│   │   ├── CheckInput.svelte
│   │   ├── Pagination.svelte
│   │   ├── SearchInput.svelte
│   │   ├── Selection.svelte
│   │   ├── Switch.svelte
│   │   └── Table.svelte
│   ├── icons/              # Componentes de íconos
│   │   ├── ChangesLogIcon.svelte
│   │   ├── JsonEditIcon.svelte
│   │   ├── LoadingIcon.svelte
│   │   ├── SearchIcon.svelte
│   │   ├── SettingsIcon.svelte
│   │   └── TrashIcon.svelte
│   ├── layout/             # Componentes de diseño
│   │   ├── Layout.svelte
│   │   └── EditorLayout.svelte
│   └── modals/            # Componentes de modales
│       ├── Modal.svelte
│       ├── ModalManager.svelte
│       └── templates/     # Plantillas específicas de modales
│           ├── AlertDeletePropertyModal.svelte
│           ├── EditPropertyModal.svelte
│           └── MergePropertyModal.svelte
├── lib/                     # Lógica de negocio y utilidades
│   ├── models/             # Interfaces y tipos
│   │   ├── language.interface.ts
│   │   ├── pagination.interface.ts
│   │   └── section-type.ts
│   ├── events/            # Sistema de eventos
│   │   └── publish/
│   │       └── basic-filter-and-pagination.event.ts
│   ├── stores/            # Stores y estado global
│   │   ├── modal-provider.svelte.ts
│   │   ├── suggestion-provider.svelte.ts
│   │   ├── table-provider.svelte.ts
│   │   ├── vscode-event-listener.svelte.ts
│   │   └── vscode-event-publish.svelte.ts
│   └── utils/             # Funciones utilitarias
│       └── debounce.ts
├── App.svelte               # Componente raíz
├── main.ts                 # Punto de entrada
└── vite-env.d.ts           # Tipos de Vite
```
