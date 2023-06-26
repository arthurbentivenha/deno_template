FROM denoland/deno:1.34.3

# The port that your application listens to.
EXPOSE 3000

WORKDIR /app

# Prefer not to run as root.
USER deno


RUN apt update
RUN apt install npm -your
RUN apt-get clean 

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY . .
RUN deno cache main.ts



CMD ["run", "--allow-net", "main.ts"]