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
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using VideoKlubModels;

namespace VideoKlub
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
            services.AddRazorPages();
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddDbContext<VideoKlubContext>(options =>
            {
                options.UseInMemoryDatabase(databaseName: "VideoKlubovi");
                //options.UseSqlite("Data Source=VideoKlubovi.db");
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, VideoKlubContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllers();
            });

            // OVO TI GENERISE PODATKE
            // SVKI PUT KAD SE IZVRSI

            var k1 = new VideoKlubModels.VideoKlub
            {
                Name = "kurac",
            };

            var k2 = new VideoKlubModels.VideoKlub
            {
                Name = "kurac2",
            };

            context.VideoKlubs.Add(k1);
            context.VideoKlubs.Add(k2);

            context.Policas.Add(new Polica { Name = "pizdarija", MaxDVD = 5, TrenutnoDVD = 0, VideoKlub = k1 });
            context.Policas.Add(new Polica { Name = "pickarija", MaxDVD = 6, TrenutnoDVD = 1, VideoKlub = k1 });
            context.Policas.Add(new Polica { Name = "mamojebarija", MaxDVD = 16, TrenutnoDVD = 16, VideoKlub = k1 });

            context.Policas.Add(new Polica { Name = "pizdarija2", MaxDVD = 5, TrenutnoDVD = 0, VideoKlub = k2 });
            context.Policas.Add(new Polica { Name = "pickarija2", MaxDVD = 6, TrenutnoDVD = 1, VideoKlub = k2 });
            context.Policas.Add(new Polica { Name = "mamojebarija2", MaxDVD = 16, TrenutnoDVD = 16, VideoKlub = k2 });

            context.SaveChanges();

        }
    }
}

