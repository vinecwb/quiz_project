import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quiz API",
      version: "1.0.0",
      description: "Documentação da API do Quiz",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      schemas: {
        Quiz: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            title: {
              type: 'string',
            },
            subjectId: {
              type: 'integer',
            },
            questions: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Question'
              }
            }
          }
        },
        Question: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            text: {
              type: 'string',
            },
            correctAnswer: {
              type: 'string',
            },
            options: {
              type: 'string',
              description: 'Opções armazenadas como JSON (string)',
            }
          }
        },
        Result: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            quizId: {
              type: 'integer',
            },
            userId: {
              type: 'integer',
            },
            correct: {
              type: 'integer',
            },
            total: {
              type: 'integer',
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
