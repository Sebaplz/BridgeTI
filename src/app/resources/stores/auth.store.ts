/**
 * AuthStore interface
 * Store utilizado para manejar la autenticación de un usuario
 */
export interface AuthStore {
  /** email
   * Email del usuario actual, para mostrarlo en la barra de navegación
   */
  email: string | null;
  /**
   * token
   * Token de autenticación del usuario
   */
  token: string | null;

  /**
   * check
   * Vaalidar si los datos estan cargados
   */
  check: boolean;

  /**
   * loading
   * Indica si se está cargando la información
   */
  loading: boolean;

  /**
   * isLoggedIn
   * Indica si el usuario esta autenticado o no
   */
  isLoggedIn: boolean;

  /**
   * error
   * Error que puede ocurrir durante la autenticación
   */
  error: string | null;

  /**
   * rememberMe
   * Indica si el usuario quiere que se mantenga autenticado
   */
  rememberMe: boolean;
}
