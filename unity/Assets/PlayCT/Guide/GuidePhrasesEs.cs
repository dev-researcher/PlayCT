namespace PlayCT.Guide
{
    /// <summary>Frases fijas en español. La guía no nombra CT ni dicta la jugada.</summary>
    public static class GuidePhrasesEs
    {
        public enum Material { Hanoi, Cubo, Gabinete }

        public const string Nivel1 = "El material no aceptó esa acción. Obsérvelo otra vez.";

        public const string Tutorial =
            "En esta mesa el material le avisa cuando algo no corresponde: no encaja y vuelve. No hay penalización. Puede tomarse el tiempo que necesite. Yo no le voy a dictar el movimiento.";

        public static string Nivel2(Material m)
        {
            switch (m)
            {
                case Material.Hanoi:
                    return "¿Qué tiene que quedar libre antes de poder mover esta pieza?";
                case Material.Cubo:
                    return "Si ejecuta ese giro, ¿qué relación debería seguir igual?";
                default:
                    return "¿Dónde encaja esta pieza respecto a las otras?";
            }
        }

        public static string Nivel3(Material m)
        {
            switch (m)
            {
                case Material.Hanoi:
                    return "El disco más grande solo puede viajar cuando los que lo cubren ya no están. ¿Dónde deberían estar ahora esos discos?";
                case Material.Cubo:
                    return "Mire solo la cara de la tarjeta. ¿Qué tiene que quedar en su sitio para no deshacer el trabajo anterior?";
                default:
                    return "Compare el perfil de la base con el hueco. ¿Qué tiene que coincidir?";
            }
        }
    }
}
