Feature: Cancelación de reservas
  Como usuario registrado
  Quiero cancelar una reserva
  Para liberar el espacio que no utilizaré

  Scenario: Cancelación exitosa con anticipación
    Given que existe una reserva confirmada con ID "RES-100" para la fecha "2026-11-20"
    When el usuario solicita cancelar la reserva "RES-100" en la fecha "2026-11-01"
    Then la reserva "RES-100" debe cambiar su estado a "CANCELLED"
    And la respuesta debe retornar un código de estado 200