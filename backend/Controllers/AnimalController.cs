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


    // lista todos os animais
    [HttpGet]
    public async Task<IActionResult> GetAnimais()
    {
        var animais = await _context.Animais.ToListAsync();

        return Ok(animais);
    }


    // cadastra animal
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
}