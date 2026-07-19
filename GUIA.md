# GUIA DE COMANDOS UTILIZADOS

```bash

dotnet new webapi -o PastaProjeto
dotnet new apicontroller -n Nome -o Pasta

dotnet add package nomepacote
dotnet build


dotnet ef migrations add nomeMigracao #para criar ou modificar uma classe  
dotnet ef database update #atualiza banco

sudo docker exec -it pet_db /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'PetShop123@' -C #acessar banco de dados
```