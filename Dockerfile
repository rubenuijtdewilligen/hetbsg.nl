FROM node:latest AS sk-build
WORKDIR /usr/src/app

ARG TZ=Europe/Amsterdam

COPY . /usr/src/app
RUN apt-get update && apt-get install -y curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm install


ARG PUBLIC_ELASTICSEARCH_URL=${PUBLIC_ELASTICSEARCH_URL}
ENV PUBLIC_ELASTICSEARCH_URL=${PUBLIC_ELASTICSEARCH_URL}
ARG ELASTICSEARCH_USERNAME=${ELASTICSEARCH_USERNAME}
ENV ELASTICSEARCH_USERNAME=${ELASTICSEARCH_USERNAME}
ARG ELASTICSEARCH_PASSWORD=${ELASTICSEARCH_PASSWORD}
ENV ELASTICSEARCH_PASSWORD=${ELASTICSEARCH_PASSWORD}

RUN npm run build

FROM node:latest
WORKDIR /usr/src/app

ARG TZ=Europe/Amsterdam
RUN apt-get update && apt-get install -y curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/package-lock.json /usr/src/app/package-lock.json

COPY --from=sk-build /usr/src/app/build /usr/src/app/build

EXPOSE 3000
CMD ["node", "build/index.js"]