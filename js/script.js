let participantes = [
  {
    nome:"Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome:"Fernanda Silva",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: new Date(2024, 2, 26, 8, 15)
  },
  {
    nome:"João Santos",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 14, 15),
    dataCheckIn: new Date(2024, 2, 27, 19, 30)
  },
  {
    nome:"Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 9, 45),
    dataCheckIn: new Date(2024, 2, 28, 12, 15)
  },
  {
    nome:"Carlos Oliveira",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 12, 0),
    dataCheckIn: new Date(2024, 2, 28, 18, 0)
  },
  {
    nome:"Larissa Lima",
    email: "larissa@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 15, 30),
    dataCheckIn: new Date(2024, 2, 29, 23, 45)
  },
  {
    nome:"Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 8, 20),
    dataCheckIn: new Date(2024, 3, 1, 20, 30)
  },
  {
    nome:"Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 11, 10),
    dataCheckIn: new Date(2024, 3, 2, 19, 10)
  },
  {
    nome:"Lucas Pereira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 14, 50),
    dataCheckIn: null
  },
  {
    nome:"Aline Santos",
    email: "aline@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 17, 40),
    dataCheckIn: null
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button onclick="fazerCheckIn(event)" data-email="${participante.email}">
     Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
      <td>
          <strong>
          ${participante.nome}
          </strong>
          <br>
          <small>
              ${participante.email}
          </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  for(let participante of participantes) {
    output += criarNovoParticipante(participante)
  }


  document.querySelector('tbody').innerHTML = output
}
const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
  })

  if(participanteExiste) {
    alert("Email já cadastrado")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  if(confirm("Tem certeza que deseja fazer o chek-in?") == false) {
    return 
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()
  atualizarLista(participantes)
}
atualizarLista(participantes)

