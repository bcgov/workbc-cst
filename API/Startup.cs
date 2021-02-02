using System;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using SearchAllOccupationsToolAPI.DbContexts;

namespace SearchAllOccupationsToolAPI
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
//            var connectionString = Configuration.GetConnectionString("Database");
            //services.AddDbContext<EducationLevelContext>(op => op.UseSqlServer(connectionString));
            if (Convert.ToBoolean(Configuration["UseSQL"]))
            {
                var connectionString = Configuration.GetConnectionString("Database");
                services.AddDbContext<GeographicAreasContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<EducationLevelContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<OccupationalGroupContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<OccupationalInterestContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<IndustryContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<FullOrPartTimeContext>(op => op.UseSqlServer(connectionString));
                services.AddDbContext<OccupationContext>(op => op.UseSqlServer(connectionString));
            }
            else
            {
                var inMemoryDbName = "SaoInMemoryDb";
                services.AddDbContext<GeographicAreasContext>(opt => opt.UseInMemoryDatabase(inMemoryDbName));
                services.AddDbContext<EducationLevelContext>(opt => opt.UseInMemoryDatabase(inMemoryDbName));
                services.AddDbContext<OccupationalGroupContext>(opt => opt.UseInMemoryDatabase(inMemoryDbName));
                services.AddDbContext<OccupationalInterestContext>(opt => opt.UseInMemoryDatabase(inMemoryDbName));
                services.AddDbContext<IndustryContext>(opt => opt.UseInMemoryDatabase(inMemoryDbName));
                services.AddDbContext<FullOrPartTimeContext>(opt => opt.UseInMemoryDatabase(inMemoryDbName));
                services.AddDbContext<OccupationContext>(opt => opt.UseInMemoryDatabase(inMemoryDbName));
            }

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins(Configuration["CORSOrigins"]);
                    });
            });

            services.AddControllers()
                .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("./swagger/v1/swagger.json", "Search All Occupations API V.1.0.0.0");
                c.RoutePrefix = string.Empty;
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
             
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
