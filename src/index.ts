import express from 'express';

async function main(): Promise<void> {
  const app = express();

  app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
}

main();
