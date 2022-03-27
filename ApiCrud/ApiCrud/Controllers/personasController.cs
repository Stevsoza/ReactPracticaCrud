using ApiCrud.Data;
using ApiCrud.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class personasController : ControllerBase
    {
        private readonly contextoAplicacion _context;
        

        public personasController(contextoAplicacion contexto)
        {
            _context = contexto;
        }
        // GET: api/<personasController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.PersonasTB.ToList());
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<personasController>/5
        [HttpGet("{id}", Name="GetPersona")]
        public ActionResult Get(int id)
        {
            try
            {
                var persona = _context.PersonasTB.FirstOrDefault(p => p.id == id);
                return Ok(persona);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<personasController>
        [HttpPost]
        public ActionResult Post([FromBody] PersonaTB persona)
        {
            try
            {
                _context.PersonasTB.Add(persona);
                _context.SaveChanges();
                return CreatedAtRoute("GetPersona", new { id = persona.id }, persona);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<personasController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] PersonaTB persona)
        {
            try
            {
                if(persona.id == id)
                {
                    _context.Entry(persona).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetPersona", new { id = persona.id }, persona);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<personasController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var persona = _context.PersonasTB.FirstOrDefault(p => p.id == id);
                if(persona != null)
                {
                    _context.PersonasTB.Remove(persona);
                    _context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
