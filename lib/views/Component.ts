export interface ComponentState {
  isVisible?: boolean;
}

/**
 * Represents a composable element. There is a high probability
 * that this will be replaced with React at some point.
 */
export interface Component {
  /**
   * Returns an object that can be retrieved when package is activated
   */
  serialize(): ComponentState;

  /**
   * Tear down any state and detach
   */
  destroy(): void;

  /**
   * Gets the HTMLElement that can be put into a page
   */
  getElement(): HTMLElement;

  isVisible(): boolean;

  show(): void;

  hide(): void;
}