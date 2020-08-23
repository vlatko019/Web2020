using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using web2020januarA.Models;

namespace web2020januarA
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
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddDbContext<PekaraDbContext>(options =>
            {
                options.UseInMemoryDatabase(databaseName: "Pekara");
                //options.UseSqlite("Data Source=VideoKlubovi.db");
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, PekaraDbContext context)
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

            var Fabrika = new Fabrika()
            {
                Naziv = "Pajina fabrika"
            };

            var Silos1 = new Silos()
            {
                Fabrika = Fabrika,
                Kapacitet = 1000,
                Oznaka = "Pajin prvi silos",
                TrenKolicina = 420
            };

            var Silos2 = new Silos()
            {
                Fabrika = Fabrika,
                Kapacitet = 2000,
                Oznaka = "Pajin drugi silos",
                TrenKolicina = 1080
            };

            context.Silosi.Add(Silos1);
            context.Silosi.Add(Silos2);
            context.Fabrike.Add(Fabrika);

            Fabrika = new Fabrika()
            {
                Naziv = "Pajina fabrika 2"
            };

            Silos1 = new Silos()
            {
                Fabrika = Fabrika,
                Kapacitet = 1000,
                Oznaka = "Pajin prvi silos 2",
                TrenKolicina = 420
            };

            Silos2 = new Silos()
            {
                Fabrika = Fabrika,
                Kapacitet = 2000,
                Oznaka = "Pajin drugi silos 2",
                TrenKolicina = 1080
            };

            context.Silosi.Add(Silos1);
            context.Silosi.Add(Silos2);
            context.Fabrike.Add(Fabrika);

            context.SaveChanges();
        }
    }
}
