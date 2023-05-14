FROM node:16
RUN apt update -y
ENV WDIR /opt/rocci
RUN mkdir -p $WDIR
WORKDIR $WDIR
COPY ./ $WDIR
RUN npm i
CMD ["node",'--max-old-space-size=16384',"server.js"]
