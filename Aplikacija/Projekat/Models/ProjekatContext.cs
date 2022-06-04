using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class ProjekatContext:DbContext
    {
        public DbSet<Korisnik> Korisnici { get; set; }

        public DbSet<Domacinstvo> Domacinstva { get; set; }

        public DbSet<Recenzija> Recenzije { get; set; }

        public DbSet<Proizvod> Proizvodi { get; set; }

        public DbSet<Kupovina> Kupovine { get; set; }

        public DbSet<Dostavljac> Dostavljaci { get; set; }

        public DbSet<Posao> Poslovi { get; set; }

        public DbSet<Administrator> Administrator { get; set; }

        public DbSet<Spoj> Spojevi { get; set; }

        public DbSet<Poruka> Poruke { get; set; }

        //public DbSet<FileUpload> Slike { get; set; }

        public ProjekatContext(DbContextOptions opt) : base(opt)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Proizvod>()
                        .HasOne(s => s.Kupovina)
                        .WithOne(p => p.Proizvod)
                        .HasForeignKey<Kupovina>(a => a.ProizvodFK);

        }
    }
}