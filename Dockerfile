# Build stage
FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM node:18 as serve-stage
WORKDIR /app
# Copy build artifacts from the build stage
COPY --from=build-stage /app/dist .
# Install `serve`
RUN npm install -g serve
# Expose the port `serve` will run on
EXPOSE 5000
# Serve your app on port 5000
CMD ["serve", "-s", ".", "-l", "5000"]
