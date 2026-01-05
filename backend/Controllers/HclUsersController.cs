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
        [Route("/getUsers")]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [Route("/addUsers")]
        [HttpPost]
        public async Task<IActionResult> AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [Route("/deleteUsers/{id}")]
        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            return Ok("Deleted successfully");
        }

        [Route("/updateUser")]
        [HttpPatch]
        public IActionResult UpdateUser([FromBody] User userParam)
        {
            return Ok("Updated Successfully");
        }
    }

   
}
