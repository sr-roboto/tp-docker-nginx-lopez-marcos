export default class ClassName {
  private static instancia: ClassName;
  private constructor() {}

  static obtenerInstancia(): ClassName {
    if (!ClassName.instancia) {
      ClassName.instancia = new ClassName();
    }
    return ClassName.instancia;
  }
}
