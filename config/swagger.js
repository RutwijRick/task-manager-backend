import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Board: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        createdBy: { type: 'integer' }
                    }
                },
                Task: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        status: { type: 'string' },
                        boardId: { type: 'integer' },
                        teamId: { type: 'integer' },
                        createdBy: { type: 'integer' }
                    }
                },
                Comment: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        text: { type: 'string' },
                        taskId: { type: 'integer' },
                        commentedBy: { type: 'integer' }
                    }
                },
                Team: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;