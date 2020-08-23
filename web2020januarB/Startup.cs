using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using web2020januarB.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;

namespace web2020januarB
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddDbContext<BibliotekaDbContext>(options =>
            {
                options.UseInMemoryDatabase(databaseName: "BAZA");
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, BibliotekaDbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });


            var b = new Biblioteka()
            {
                Ime = "Pajina Biblioteka",
                Police = new List<Polica>()
            };

            context.Bibliotekas.Add(b);

            var p = new Polica()
            {
                MaxKnjiga = 10,
                Name = "Pajine prve knjige",
                TrenutnoKnjiga = 7
            };

            b.Police.Add(p);

            p = new Polica()
            {
                MaxKnjiga = 7,
                Name = "Pajine druge knjige",
                TrenutnoKnjiga = 4
            };
            b.Police.Add(p);

            p = new Polica()
            {
                MaxKnjiga = 5,
                Name = "Pajine trece knjige",
                TrenutnoKnjiga = 2,
                BibliotekaId = b.Id
            };

            b.Police.Add(p);

            b = new Biblioteka()
            {
                Ime = "Perina Biblioteka",
                Police = new List<Polica>()
            };
            context.Bibliotekas.Add(b);


            p = new Polica()
            {
                MaxKnjiga = 3,
                Name = "Perine prve knjige",
                TrenutnoKnjiga = 1
            };
            b.Police.Add(p);

            p = new Polica()
            {
                MaxKnjiga = 4,
                Name = "Perine druge knjige",
                TrenutnoKnjiga = 3
            };
            b.Police.Add(p);

            p = new Polica()
            {
                MaxKnjiga = 10,
                Name = "Perine trece knjige",
                TrenutnoKnjiga = 6
            };
            b.Police.Add(p);

            context.SaveChanges();
        }
    }
}
