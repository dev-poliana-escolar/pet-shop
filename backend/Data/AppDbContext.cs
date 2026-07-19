using Microsoft.EntityFrameworkCore;
using backend.Models;
namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Animal> Animais { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Animal>()
            .Property(a => a.Peso)
            .HasPrecision(5, 2);
    }

    public DbSet<Usuario> Usuarios { get; set; }
}