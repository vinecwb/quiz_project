import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || "defaultSecretKey";

/**
 * Extrai e verifica o token JWT a partir da requisição.
 * @param {Request} req - Objeto de requisição do Express.
 * @returns {Object} decoded - Payload decodificado do token.
 * @throws {Error} Se o token não estiver presente, inválido ou expirado.
 */
export const getDecodedToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Token não fornecido ou inválido");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new Error("Token inválido ou expirado");
    }
};