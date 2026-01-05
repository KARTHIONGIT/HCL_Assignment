using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HclUsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public HclUsersController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("/getUsers")]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpPost("/addUsers")]
        public async Task<IActionResult> AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpDelete("/deleteUsers/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound($"User with id {id} not found");
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok($"User with id {id} deleted successfully");
        }

        [HttpPatch("/updateUser/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User userParam)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound($"User with id {id} not found");
            }
            user.Name = userParam.Name ?? user.Name;
            user.City = userParam.City ?? user.City;
            user.Pincode = userParam.Pincode ?? user.Pincode;
            user.State = userParam.State ?? user.State;
            user.Age = userParam.Age != 0 ? userParam.Age : user.Age;

            await _context.SaveChangesAsync();

            return Ok(user);
        }
    }
}
