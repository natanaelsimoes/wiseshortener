FROM node:latest
COPY ./ /code
WORKDIR /code
RUN yarn
RUN yarn build
ENV NODE_ENV=production
ENV DATABASE_URL=postgres://postgres:123@postgres:5432/wise_prod
ENV DATABASE_SSL=false
CMD ["node", "build/Server.js"]