declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add a custom property for styled-jsx
    jsx?: boolean;
  }
}
