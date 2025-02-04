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
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'João',
            },
            lastname: {
              type: 'string',
              example: 'Silva',
            },
            email: {
              type: 'string',
              example: 'joao.silva@example.com',
            },
            isTeacher: {
              type: 'boolean',
              example: false,
            }
          },
        },
        // Schema para a resposta de registro/login de usuário
        UserResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'User registered successfully',
            },
            user: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Login successful',
            },
            token: {
              type: 'string',
              example: '1a2e5g6a...'
            }
          }
        },
        // Schema para erro
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Internal server error'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object'
              }
            }
          }
        },
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
        QuizStudent: {
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
            solved: {
              type: 'boolean',
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
              example: ["1", "2", "3"],
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
