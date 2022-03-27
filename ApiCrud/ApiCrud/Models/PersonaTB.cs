using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCrud.Models
{
    public class PersonaTB
    {
        [Key]
        public int id { get; set; }

        public string nombre { get; set; }

        public string telefono { get; set; }

        public string direccion { get; set; }
    }
}
