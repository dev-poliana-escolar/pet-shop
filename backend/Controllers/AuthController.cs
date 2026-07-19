using backend.Auth;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(AppDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        if (await _context.Usuarios.AnyAsync(u => u.Email == model.Email))
        {
            return BadRequest("Este e-mail já está cadastrado.");
        }

        var usuario = new Usuario
        {
            Nome = model.Nome,
            Email = model.Email,
            SenhaHash = BCrypt.Net.BCrypt.HashPassword(model.Senha)
        };

        _context.Usuarios.Add(usuario);

        await _context.SaveChangesAsync();

        return Created("", new {
            mensagem = "Usuário cadastrado com sucesso."
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Email == model.Email);

        if (usuario == null)
        {
            return Unauthorized("Usuário ou senha inválidos.");
        }

        bool senhaCorreta =
            BCrypt.Net.BCrypt.Verify(model.Senha, usuario.SenhaHash);

        if (!senhaCorreta)
        {
            return Unauthorized("Usuário ou senha inválidos.");
        }

        var token = _jwtService.GerarToken(usuario);

        return Ok(new {
            token,
            usuario = new
            {
                usuario.Id,
                usuario.Nome,
                usuario.Email
            }
        });
    }
}