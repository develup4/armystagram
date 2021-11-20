import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      console.log(`Confirm secret attempt ${email} ${secret}`);

      const user = await prisma.user({ email });
      console.log(user);
      console.log(`User's secret : ${user.Secret}`);

      if (user.Secret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            Secret: '',
          },
        });

        const token = generateToken(user.id);
        console.log(`Generated token : ${token}`);
        return token;
      } else {
        return '';
      }
    },
  },
};
