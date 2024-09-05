namespace Portfolio.Server
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // Inject our private variables here
            if (File.Exists("./wwwroot/index.html"))
            {
                string privacyName = Environment.GetEnvironmentVariable("PORTFOLIO_PRIVACY_NAME") ?? "John";
                string privacyFamilyName = Environment.GetEnvironmentVariable("PORTFOLIO_PRIVACY_FAMILY_NAME") ?? "DOE";
                string privacyLnkUrl = Environment.GetEnvironmentVariable("PORTFOLIO_PRIVACY_LINKEDIN_URL") ?? "https://www.linkedin.com/in/johndoe";
                string privacyGhUrl = Environment.GetEnvironmentVariable("PORTFOLIO_PRIVACY_GITHUB_URL") ?? "https://github.com/John/Doe";
                string privacyMail = Environment.GetEnvironmentVariable("PORTFOLIO_PRIVACY_MAIL") ?? "john.doe@gmail.com";
                string meetingUrl = Environment.GetEnvironmentVariable("PORTFOLIO_PRIVACY_MEETING_URL") ?? "";
                string meetingUrlFr = Environment.GetEnvironmentVariable("PORTFOLIO_PRIVACY_MEETING_URL_FR") ?? "";

                string html = await File.ReadAllTextAsync("./wwwroot/index.html");
                html = html.Replace("[[PRIVACY_NAME]]", privacyName)
                    .Replace(
                    "[[PRIVACY_VARIABLES]]",
                    @$"<script>const PORTFOLIO = {{ 
                        NAME: '{privacyName}',
                        FAMILY_NAME: '{privacyFamilyName}',
                        LINKEDIN_URL: '{privacyLnkUrl}',
                        GITHUB_URL: '{privacyGhUrl}',
                        MAIL: '{privacyMail}',
                        MEETING_URL: '{meetingUrl}',
                        MEETING_URL_FR: '{meetingUrlFr}',
                    }}</script>");

                await File.WriteAllTextAsync("./wwwroot/index.html", html);
            }

            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();

            WebApplication app = builder.Build();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.MapFallbackToFile("/index.html");
            app.Run();
        }
    }
}
