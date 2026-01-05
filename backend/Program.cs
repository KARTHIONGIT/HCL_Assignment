using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllPolicy", policy => { policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin(); });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=data/app.db")
);

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    //if (!db.Users.Any())
    //{
    //    db.Users.AddRange(
    //        new User
    //        {
    //            Name = "Karthikeyan",
    //            Age = 25,
    //            City = "Chennai",
    //            Pincode = "600001",
    //            State = "Tamil Nadu"
    //        },
    //        new User
    //        {
    //            Name = "Arun",
    //            Age = 28,
    //            City = "Bangalore",
    //            Pincode = "560001",
    //            State = "Karnataka"
    //        },
    //        new User
    //        {
    //            Name = "Vijay",
    //            Age = 28,
    //            City = "Madurai",
    //            Pincode = "600033",
    //            State = "Tamil Nadu"
    //        }
    //    );

    //    db.SaveChanges();
    //}
}

app.UseHttpsRedirection();

app.UseCors("AllowAllPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
