namespace backend.Models;

public class Endereco
{
    public int Id {get; set;}
    public int CEP {get;set;}
    public int Numero {get;set;}
    public string Bairro  = string.Empty;
    public string Cidade = string.Empty; 
    public string UF = string.Empty;
    public string Logradouro = string.Empty;
}
