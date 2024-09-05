FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -yq nodejs build-essential

USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -yq nodejs build-essential

ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Portfolio.Server/Portfolio.Server.csproj", "Portfolio.Server/"]
RUN dotnet restore "./Portfolio.Server/Portfolio.Server.csproj"
COPY . .
WORKDIR "/src/Portfolio.Server"
RUN dotnet build "./Portfolio.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Portfolio.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
RUN chmod -R 755 /app/publish/wwwroot && chown -R app /app/publish/wwwroot

FROM base AS final
USER app
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Portfolio.Server.dll"]