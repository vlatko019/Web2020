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
using web2020jun.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;

namespace web2020jun
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

            services.AddDbContext<TenisDbContext>(options =>
            {
                options.UseInMemoryDatabase(databaseName: "Tenis");
                //options.UseSqlite("Data Source=VideoKlubovi.db");
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, TenisDbContext context)
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

            var igrac1 = new Igrac
            {
                Godine = 33,
                Ime = "Novak Djokovic",
                Rang = 1,
                Slika = "https://www.gstatic.com/tv/thumb/persons/633923/633923_v9_ba.jpg"
            };

            var igrac2 = new Igrac
            {
                Godine = 35,
                Ime = "Rafael Nadal",
                Rang = 2,
                Slika = "https://www.tennisworldusa.org/imgb/93582/rafael-nadal-i-had-injuries-but-i-never-lost-motivation-.jpg"
            };

            context.Igraci.Add(igrac1);
            context.Igraci.Add(igrac2);

            var mec1 = new Mec
            {
                Igrac1 = igrac1,
                Igrac2 = igrac2,
                Lokacija = "asd"
            };
            var mec2 = new Mec
            {
                Igrac1 = igrac1,
                Igrac2 = igrac2,
                Lokacija = "123"
            };
            context.Mecevi.Add(mec1);
            context.Mecevi.Add(mec2);

            context.SaveChanges();
        }
    }
}
