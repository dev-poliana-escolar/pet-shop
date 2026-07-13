namespace backend.Models;

public class Endereco
{
    public int Id {get; set;}
    public int CEP {get;set;}
    public int Numero {get;set;}
    public string Bairro {get;set;} = string.Empty;
    public string Cidade {get;set;} = string.Empty; 
    public string UF {get;set;} = string.Empty;
    public string Logradouro {get;set;} = string.Empty;
}
