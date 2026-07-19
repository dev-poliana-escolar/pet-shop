namespace backend.Models;

public class Animal
{
    public int Id {get; set;}
    public string Nome  {get; set;} = string.Empty;
    public int Idade{ get; set;} 
    public decimal Peso {get; set;} 
    public string Especie {get;set;} = string.Empty;
    public DateOnly DataNascimento {get;set;} 
    public string NomeTutor {get;set;} = string.Empty;
    public string CPF{get;set;} = string.Empty;
    public string CEP { get; set; } = string.Empty;
    public int Numero{get;set;} 
    public string Bairro{get;set;} = string.Empty;
    public string Cidade{get;set;} = string.Empty;
    public string UF {get;set;} = string.Empty;
    public string Logradouro{get;set;} = string.Empty;
}
