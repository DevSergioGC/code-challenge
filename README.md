# code-challenge

## Pasos para correr el proyecto

1. Clonar el siguiente repositorio

```bash
git clone https://github.com/DevSergioGC/code-challenge.git
```
2. Moverse al directorio recién creado

```bash
cd code-challenge/
```
3. Instalar dependencias

```bash
npm install
```
4. Correr el proyecto en modo desarrollador

```bash
npm run dev
```
 **Nota: Luego de correr el anterior comando, se crearán las tablas en la base de datos. Los querys para la creacion de las tablas tienen un timeout, por lo que antes de correr el siguiente comando se debe esperar aprox. 6 secs**
 
 **Para correr el siguiente comando el programa debe estar corriendo, por lo que se sugiere crear otra terminal**

5. Poblar la base de datos con los datos de prueba

```bash
npm run mock
```

**Nota: El path para la documentación swagger es [/api-docs](http:localhost:8000/api-docs)**

**Los Schemas utilizados en el proyecto están detallados en el swagger, por lo que si, se necesita más información sobre un campo en específico, puede revisar la documentación en swagger.**

## Modelo de Datos

![Diagrama de la base de datos](/public/images/db-model.png "Diagrama de la base de datos")

## Validaciones

### cliente/created

- Nombre del cliente debe contener al menos 3 carácteres y máximo 255. No se permite el envío de formulario con el campo vacío.

### certificado/request

- Los campos "tasa" y "monto_inicial" deben ser números mayores o iguales a 0. No se permiten su valor en blanco a la hora de enviar el formulario.
- Los campos "fec_vencimiento" y "fec_creado" son de tipo Date, no es necesario enviar la hora en el formulario (se puede borrar la que aparece por default en el swagger a la hora de hacerle un Try).
- Si no se especifica el campo "fec_creado" en el formulario, el sistema registrará la hora a la que se hizo la petición.
- El campo "id_cliente" debe ser mayor o igual a 1.
- Si el cliente no existe en la base de datos a la hora de solicitar el certificado, saltará un error en la respuesta.

### certificado/deposito

- Los campos "id_certificado" y "monto" deben ser números mayores o iguales a 1.
- Si el certificado indicado no existe, el sistema lanzará un error.
- Si el certificado indicado ha sido finalizado (la fecha de vencimiento del certificado ya pasó), no se podrá realizar depósitos.

### certificado/retiro

- Los campos "id_certificado" y "monto" deben ser números mayores o iguales a 1.
- Si el certificado indicado no existe, el sistema lanzará un error.
- Si el certificado indicado aún sigue vigente (la fecha de vencimiento aún no ha pasado), se aplicará una penalidad del 10% (0.10) al monto total a retirar. De lo contrario, se retirará del certificado el monto indicado por el usuario en la petición.
- Si el certificado indicado tiene un balance total de cero (0) o si el monto a retirar es mayor al balance total del certificado el sistema no permitirá el retiro y lanzará un error.

