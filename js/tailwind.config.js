tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            brand: {
              50: '#f5f3ff',
              100: '#ede9fe',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              900: '#4c1d95',
              950: '#2e1065',
            },
            dark: {
              surface: '#0f172a',
              card: '#1e293b',
              border: '#334155',
              highlight: '#273449'
            }
          }
        }
      }
    }
