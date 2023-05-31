using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Kliensoldali_FF_backend.Controllers
{
    public class ExternalAuthController:ControllerBase
    {
        [HttpGet("signin/{provider}")]
        public IActionResult SignIn(string provider, string returnUrl = "/")
        {
            return Challenge(new AuthenticationProperties { RedirectUri = returnUrl }, provider);
        }
    }
}
