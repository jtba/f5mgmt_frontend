# FROM was redacted due to it being company specific. Future versions may include a public docker image
FROM your_docker_image
RUN \

    export NODE_TLS_REJECT_UNAUTHORIZED=0 \

    ##App Specific Information##
    #create directory for app
    && mkdir /app \
    && cd /app \

    #Download app from git
    && git -c http.sslVerify=false clone https://github.com/jtba/f5mgmt_frontend.git . \
    #&& git checkout master \

    ##Install node modules##
    && npm install

ENTRYPOINT ["node", "/app/server.js"]
