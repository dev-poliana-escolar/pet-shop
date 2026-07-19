using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AnimalController : ControllerBase
{
    private readonly AppDbContext _context;

    public AnimalController(AppDbContext context)
    {
        _context = context;
    }

    // Lista todos os animais
    [HttpGet]
    public async Task<IActionResult> GetAnimais()
    {
        var animais = await _context.Animais.ToListAsync();
        return Ok(animais);
    }

    // Cadastra um animal
    [HttpPost]
    public async Task<IActionResult> CriarAnimal(Animal animal)
    {
        _context.Animais.Add(animal);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetAnimais),
            new { id = animal.Id },
            animal
        );
    }

    // Edita um animal
    [HttpPut("{id}")]
    public async Task<IActionResult> EditarAnimal(int id, Animal animal)
    {
        if (id != animal.Id)
        {
            return BadRequest();
        }

        var animalExistente = await _context.Animais.FindAsync(id);

        if (animalExistente == null)
        {
            return NotFound();
        }

        animalExistente.Nome = animal.Nome;
        animalExistente.Idade = animal.Idade;
        animalExistente.Peso = animal.Peso;
        animalExistente.Especie = animal.Especie;
        animalExistente.DataNascimento = animal.DataNascimento;
        animalExistente.NomeTutor = animal.NomeTutor;
        animalExistente.CPF = animal.CPF;
        animalExistente.CEP = animal.CEP;
        animalExistente.Numero = animal.Numero;
        animalExistente.Bairro = animal.Bairro;
        animalExistente.Cidade = animal.Cidade;
        animalExistente.UF = animal.UF;
        animalExistente.Logradouro = animal.Logradouro;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Exclui um animal
    [HttpDelete("{id}")]
    public async Task<IActionResult> ExcluirAnimal(int id)
    {
        var animal = await _context.Animais.FindAsync(id);

        if (animal == null)
        {
            return NotFound();
        }

        _context.Animais.Remove(animal);

        await _context.SaveChangesAsync();

        return NoContent();
    }

// busca um animal pelo id
[HttpGet("{id}")]
public async Task<IActionResult> GetAnimal(int id)
{
    var animal = await _context.Animais.FindAsync(id);

    if (animal == null)
    {
        return NotFound();
    }

    return Ok(animal);
}
}