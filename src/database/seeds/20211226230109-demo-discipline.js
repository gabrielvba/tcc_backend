/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const disciplines = [
  {
    name: 'Introdução à Computação',
    code: 1411174,
    description: '',
    courseId: 1,
    summary: '',
    period: 1,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Programação I',
    code: 1411167,
    description: '',
    courseId: 1,
    summary: '',
    period: 1,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Laboratório de Programação I',
    code: 1411180,
    description: '',
    courseId: 1,
    summary: '',
    period: 1,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Fundamentos de Matemática para Ciência da Computação I',
    code: 1411311,
    description: '',
    courseId: 1,
    summary: '',
    period: 1,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Fundamentos de Matemática para Ciência da Computação II',
    code: 1411312,
    description: '',
    courseId: 1,
    summary: '',
    period: 2,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Cálculo Diferencial e Integral I',
    code: 2000,
    description: '',
    courseId: 1,
    summary: '',
    period: 2,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Programação II',
    code: 1411168,
    description: '',
    courseId: 1,
    summary: '',
    period: 2,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Laboratório de Programação II',
    code: 1411181,
    description: '',
    courseId: 1,
    summary: '',
    period: 2,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Álgebra Linear I',
    code: 1109049,
    description: '',
    courseId: 1,
    summary: '',
    period: 3,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Lógica para Computação',
    code: 1411307,
    description: '',
    courseId: 1,
    summary: '',
    period: 3,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Cálculo Diferencial e Integral II',
    code: 1109131,
    description: '',
    courseId: 1,
    summary: '',
    period: 3,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Estrutura de Dados',
    code: 1411305,
    description: '',
    courseId: 1,
    summary: '',
    period: 3,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Laboratório de Estrutura de Dados',
    code: 1411306,
    description: '',
    courseId: 1,
    summary: '',
    period: 3,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Teoria dos Grafos',
    code: 1411304,
    description: '',
    courseId: 1,
    summary: '',
    period: 3,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Introdução à Probabilidade',
    code: 1114129,
    description: '',
    courseId: 1,
    summary: '',
    period: 4,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Projeto de Software',
    code: 1411308,
    description: '',
    courseId: 1,
    summary: '',
    period: 4,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Paradigmas de Linguagens de Programação',
    code: 1411309,
    description: '',
    courseId: 1,
    summary: '',
    period: 4,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Banco de Dados I',
    code: 1411193,
    description: '',
    courseId: 1,
    summary: '',
    period: 4,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Organização e Arquitetura de Computadores',
    code: 1411310,
    description: '',
    courseId: 1,
    summary: '',
    period: 4,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Laboratório de Organização e Arquitetura de Computadores',
    code: 1411182,
    description: '',
    courseId: 1,
    summary: '',
    period: 4,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Estatística Aplicada',
    code: 1114222,
    description: '',
    courseId: 1,
    summary: '',
    period: 5,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Análise de Sistemas',
    code: 1411313,
    description: '',
    courseId: 1,
    summary: '',
    period: 5,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Engenharia de Software',
    code: 1411314,
    description: '',
    courseId: 1,
    summary: '',
    period: 5,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Redes de Computadores',
    code: 1411190,
    description: '',
    courseId: 1,
    summary: '',
    period: 5,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Sistemas Operacionais',
    code: 1411192,
    description: '',
    courseId: 1,
    summary: '',
    period: 5,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Teoria da Computação',
    code: 1411171,
    description: '',
    courseId: 1,
    summary: '',
    period: 5,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Metodologia Científica',
    code: 1305218,
    description: '',
    courseId: 1,
    summary: '',
    period: 6,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Programação Concorrente',
    code: 1411315,
    description: '',
    courseId: 1,
    summary: '',
    period: 6,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Inteligência Artificial',
    code: 1411316,
    description: '',
    courseId: 1,
    summary: '',
    period: 6,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Análise e Técnicas de Algoritmos',
    code: 1411316,
    description: '',
    courseId: 1,
    summary: '',
    period: 7,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Compiladores',
    code: 1411316,
    description: '',
    courseId: 1,
    summary: '',
    period: 7,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Projeto em Computação I',
    code: 1411185,
    description: '',
    courseId: 1,
    summary: '',
    period: 8,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Projeto de Trabalho de Conclsão de Curso',
    code: 1411317,
    description: '',
    courseId: 1,
    summary: '',
    period: 8,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Projeto em Computação II',
    code: 1411348,
    description: '',
    courseId: 1,
    summary: '',
    period: 8,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Trabalho de Conclsão de Curso',
    code: 1411318,
    description: '',
    courseId: 1,
    summary: '',
    period: 8,
    type: 'Obrigatória',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const discipline of disciplines) {
      const existedDiscipline = await queryInterface.rawSelect(
        'Disciplines',
        {
          where: {
            name: discipline.name,
          },
        },
        ['id'],
      );
      const existedCourse = await queryInterface.rawSelect(
        'Courses',
        {
          where: {
            id: discipline.courseId,
          },
        },
        ['id'],
      );
      if (existedCourse) {
        if (!existedDiscipline || existedDiscipline.length === 0) await queryInterface.bulkInsert('Disciplines', [discipline], {});
        else console.log(`Disciplina com o nome '${discipline.name}' já existe`);
      } else {
        console.log(`Curso com o id '${discipline.courseId}' não existe`);
      }
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete('Disciplines', disciplines, {}),
};
