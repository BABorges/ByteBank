import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 50 }, // Aumenta gradualmente até 50 usuários durante 10 segundos
    { duration: '5s', target: 50 }, // Mantém 50 usuários por mais 5 segundos
    { duration: '5s', target: 10 }, // Diminui para 10 usuários durante 5 segundos
    { duration: '5s', target: 10 }, // Mantém 10 usuários por mais 5 segundos
    { duration: '5s', target: 0 }, // Finaliza, diminuindo para 0 usuários
  ],
};

export default function () {
  // Simula o login para cada usuário
  let payload = JSON.stringify({
    email: 'cypress@teste.com',
    senha: '123',
  });
  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post('http://localhost:3000/', payload, params);

  // Verifica se o login foi bem-sucedido
  check(res, {
    'login bem-sucedido': (r) => r.status === 200 && r.body.includes('Bem vindo de volta!'),
  });

  sleep(1); // Aguarda 1 segundo antes de enviar a próxima solicitação
}
