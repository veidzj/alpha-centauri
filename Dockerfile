FROM node:20 as builder
WORKDIR /usr/src/alpha-centauri
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY . .

FROM node:20-alpine
WORKDIR /usr/src/alpha-centauri
COPY --from=builder /usr/src/alpha-centauri/dist ./dist
COPY --from=builder /usr/src/alpha-centauri/package*.json .
RUN npm install --omit=dev --ignore-scripts
ENV PORT=5000
EXPOSE $PORT
CMD ["npm", "start"]
