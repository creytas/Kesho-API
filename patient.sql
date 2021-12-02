SELECT
    COUNT(*)
FROM
    patients AS Pa
INNER JOIN(
    SELECT id,
        patientId,
        type_malnutrition,
        createdAt AS Date_Consultation
    FROM
        anthropometriques
    WHERE
        createdAt IN(
        SELECT
            MAX(createdAt)
        FROM
            anthropometriques
        GROUP BY
            patientId
    )
) AS Anthro
ON
    Anthro.patientId = Pa.id
    WHERE Pa.sexe_patient="F" AND Anthro.Date_consultation BETWEEN "2021-09-01" AND "2021-09-30"