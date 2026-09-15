Feature: Reserva de salas de coworking
  Como usuario registrado
  Quiero reservar una sala de reuniones
  Para tener un lugar privado de trabajo

  Scenario: Reserva exitosa de una sala disponible
    Given que la sala "Sala A" existe y está disponible el "2026-10-15"
    When el usuario "Juan" intenta reservar la "Sala A" para el "2026-10-15"
    Then la reserva debe ser confirmada con estado "CONFIRMED"
    And la respuesta debe retornar un código de estado 201

  Scenario: Error al intentar reservar una sala ocupada
    Given que la sala "Sala B" ya está ocupada el "2026-10-15"
    When el usuario "Maria" intenta reservar la "Sala B" para el "2026-10-15"
    Then la reserva debe ser rechazada
    And la respuesta debe retornar un código de estado 409