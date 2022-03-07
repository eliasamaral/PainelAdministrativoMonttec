// ============================================
// Database
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ObrasSchema = new mongoose.Schema({
  diagrama_ou_OV: { type:String, required: true },
  ordemDeVenda_ou_Nota: { type: String, required: true },
  status: { type: String },
  valorMaoObra: { type: String },
  cidade: { type: String },
  local: { type: String },
  observação: String,
});
const SaidaTrafoSchema = new mongoose.Schema({
  patrimonio: { type:String, required: true },
  sucataRelacionada: { type:String },
  codigo: { type:String, required: true },
  ads: { type:String, required: true },
  obra: { type:String, required: true },
  data: { type: Date, default: Date.now, required: true, },
  observacao: { type:String },
  tipo: { type:String },
});
const FuncionariosSchema = new mongoose.Schema({
  nome: { type:String, required: true},
  cargo: { type: String, require: true},
  cpf: { type: String, require: true },
  matricula: { type: String },
  Admissao: { type: Date },
  Nacimento: { type: Date },
  grupo: { type: String},
  númeroPessoal: { type: String },
  númeroEmpressarial: { type: String },
  origem: { type: String },
});
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  encryptedPassword: { type: String, required: true },
  role: { type: String, enum: ['admin', 'restricted'], required: true },
})

const Obras = mongoose.model("Obras", ObrasSchema);
const Funcionarios = mongoose.model("Funcionarios", FuncionariosSchema);
const ControleSaidaTrafo = mongoose.model("Saida de Transformadores", SaidaTrafoSchema );
const User = mongoose.model("Usuarios", UserSchema); 


const gestaoParente = { 
  name:'Gestão de Obras',
  icon: 'fa fa-coffee'
}
const funcionariosParente = { 
  name:'Rh',
  icon: 'fa fa-cog'
}
const almoxParente = { 
  name:'Almoxarifado',
  icon: 'fa fa-cog'
}

// ============================================
// Admin Bro
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose)

// config

const commonProps = {
  status: "Situação",
  createdAt: "Criação",
  updatedAt: "Atualização",
}; 
const adminBroOptions = new AdminBro({
  locale: {
    translations: {
      actions: {
        new: "Criar novo",
        edit: "Editar",
        show: "Exibir",
        delete: "Apagar",
        bulkDelete: "Apagar todos",
        list: "Listagem",
      },
      buttons: {
        save: "Salvar",
        addNewItem: "Adicionar novo item",
        filter: "Filtrar",
        applyChanges: "Aplicar alterações",
        resetFilter: "Limpar",
        confirmRemovalMany: "Deseja remover {{count}} registro?",
        confirmRemovalMany_plural: "Deseja remover {{count}} registros?",
        logout: "Logout",
        login: "Login",
        seeTheDocumentation: "Veja: <1>documentação</1>",
        createFirstRecord: "Criar o primeiro registro",
        resetPassword: "Redefinir senha",
      },
      labels: {
        navigation: "Navegação",
        pages: "Páginas",
        selectedRecords: "Selecionados ({{selected}})",
        filters: "Filtros",
        adminVersion: "Admin: {{version}}",
        appVersion: "App: {{version}}",
        loginWelcome: "Bem vindo(a)",
        users: "Usuários",
        projects: "Projetos",
        tasks: "Tarefas",
      },
      properties: {
        length: "Tamanho",
        from: "De",
        to: "Para",
      },
      resources: {
        users: {
          actions: {
            resetPassword: "Redefinir senha",
          },
          properties: {
            id: "ID",
            initials: "Iniciais",
            name: "Nome",
            email: "Email",
            password: "Senha",
            passwordHash: "Senha criptografada",
            role: "Perfil",
            ...commonProps,
          },
        },
        projects: {
          properties: {
            id: "ID",
            name: "Nome",
            description: "Descrição",
            userId: "Responsável",
            ...commonProps,
          },
        },
        tasks: {
          properties: {
            id: "ID",
            due_date: "Data de entrega",
            effort: "Esforço",
            title: "Título",
            description: "Descrição",
            order: "Prioridade",
            attachment: "Anexo",
            projectId: "Projeto",
            userId: "Responsável",
            ...commonProps,
          },
        },
      },
      messages: {
        successfullyBulkDeleted: "{{count}} registro removido com sucesso",
        successfullyBulkDeleted_plural: "{{count}} registros removidos com sucesso",
        successfullyDeleted: "Registro apagado com sucesso",
        successfullyUpdated: "Registro atualizado com sucesso",
        thereWereValidationErrors: "Existem erros de validação - veja abaixo",
        forbiddenError:
          "Você não tem permissão para executar a ação {{actionName}} de {{resourceId}}",
        anyForbiddenError: "Você não tem permissão para executar essa ação",
        successfullyCreated: "Registro criado com sucesso",
        bulkDeleteError:
          "Erro ao apagar o registro, verifique o console para mais detalhes",
        errorFetchingRecords:
          "Erro ao carregar os registros, verifique o console para mais detalhes",
        errorFetchingRecord:
          "Erro ao carregar o registro, verifique o console para mais detalhes",
        noRecordsSelected: "Você não selecionou um registro",
        theseRecordsWillBeRemoved: "O seguinte registro será apagado",
        theseRecordsWillBeRemoved_plural: "Os seguintes registros serão apagados",
        pickSomeFirstToRemove:
          "Para remover um registro, você deve selecioná-lo primeiro",
        error404Resource: "{{resourceId}} não foi encontrado",
        error404Action:
          "{{resourceId}} não possuí a ação {{actionName}} ou você não tem permissão para executá-la!",
        error404Record:
          "{{resourceId}} não possuí o registro #{{recordId}} ou você não tem permissão para visualiza-lo!",
        seeConsoleForMore:
          "Veja o console de desenvolvimento para mais detalhes...",
        noActionComponent: "Você não implementou uma ação para este componente",
        noRecordsInResource: "Não existem registros para esse recurso",
        noRecords: "Sem registros",
        confirmDelete: "Você tem certeza que deseja remover esse registro?",
        loginWelcome: "Sistema de gerenciamento de tarefas",
        email: "Email",
        password: "Senha",
        login: "Entrar",
        invalidCredentials: "Email e/ou senha inválido",
        resetPasswordMessage:
          'Uma nova senha aleatória será gerada e atribuída para este usuário, para prosseguir clique no botão "Redefinir senha".',
        newPasswordMessage: 'Nova senha "{{newPassword}}" atribuída ao usuário.',
        newPasswordMessageError: "Erro ao redefinir a senha automaticamente.",
        dashboardTitle: "Bem-vindo(a) ao Task Manager",
        dashboardSubTitle: "Controle todos seus projetos de uma forma simples",
        taskTypeCardTitle: "Tipos de Tarefas",
        taskEffortCardTitle: "Esforço por prazo",
      },
    }
  },
	resources: [{
    resource: User, options: {
      properties: {
        encryptedPassword: {
          isVisible: false,
        },
        password: {
          type: 'string',
          isVisible: {
            list: false, edit: true, filter: false, show: false,
          },
        },
      },
      actions: {
        new: {
          before: async (request) => {
            if(request.payload.password) {
              request.payload = {
                ...request.payload,
                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                password: undefined,
              }
            }
            return request
          },
        }
      }
    }},
    { resource: Obras, options: { 
      listProperties: [
          "diagrama_ou_OV",
          "ordemDeVenda_ou_Nota",
          "status",
          "valorMaoObra",
          "cidade",
          "local",
          "observação",   
      ],
      parent: gestaoParente }},
    { resource: Funcionarios, options: { listProperties:[
      "nome",
      "cargo",
      "matricula",
      "grupo",
      "cpf",
      "Admissao",
      "Nacimento",
      ],
    parent: funcionariosParente }},
    { resource: ControleSaidaTrafo, options: {
      listProperties: [
        "patrimonio",
        "sucataRelacionada",
        "ads",
        "codigo",
        "obra",
        "data",
        "observacao",
        "tipo",
    ],
      parent: almoxParente }},
  ],
  rootPath: '/admin',
  branding: {
    logo: "https://monttec.eng.br/wp-content/uploads/2019/03/logo-monttec.png",
    companyName: "Monttec",
    softwareBrothers: false,
  },
 
});

const router = AdminBroExpress.buildRouter(adminBroOptions)
// const router = AdminBroExpress.buildAuthenticatedRouter(adminBroOptions, {
//   authenticate: async (email, password) => {
//     const user = await User.findOne({ email })
//     if (user) {
//       const matched = await bcrypt.compare(password, user.encryptedPassword)
//       if (matched) {
//         return user
//       }
//     }
//     return false
//   },
//   cookiePassword: 'some-secret-password-used-to-secure-cookie',
// })

// ============================================
// Server
const express = require("express");
const server = express();

server
  .use(adminBroOptions.options.rootPath, router)

// =============================================
// Run App

const PORT = 5500
const run = async () => {
  await mongoose.connect("mongodb+srv://eliasamaral:4vzTpWK3vt6VMr9T@cluster0.mbiyl.mongodb.net/adminMonttec?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });

  await server.listen(PORT, () => console.log(`Server started in http://localhost:${PORT}/admin`));
}

run()