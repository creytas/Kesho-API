const select_operations = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation, qte_operation as "quantite",commentaire_operation as "commentaire", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id LIMIT :limitParamStart,:limitParamEnd`;
const select_operations_by_affectation = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation, qte_operation as "quantite",commentaire_operation as "commentaire", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND matiere_premieres.affectation=:affectationParam LIMIT :limitParamStart,:limitParamEnd`;
const select_operations_by_id = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation as "type opération", qte_operation as "quantite",commentaire_operation as "commentaire", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND operation_matieres.id=:id`;
const select_affectation_operations_by_date = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation, qte_operation as "quantite",commentaire_operation as "commentaire", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND matiere_premieres.affectation=:affectationParam AND operation_matieres.date_operation BETWEEN :dateParamStart AND :dateParamEnd`;
const export_operations = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation, qte_operation as "quantite",commentaire_operation as "commentaire" FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id ORDER BY date_operation DESC`;
const select_user_attendances = `SELECT DISTINCT users.id, users.id_user, users.prenom_user, users.nom_user, users.postnom_user, users.email, users.sexe_user, users.statut, users.is_admin, attendances.createdAt, attendances.attendance_state FROM attendances INNER JOIN users ON users.id=attendances.user_id WHERE attendances.createdAt IN (SELECT DISTINCT attendances.createdAt FROM attendances WHERE DATE_FORMAT(attendances.createdAt, "%Y-%m-%d")=DATE_FORMAT(CURRENT_DATE,"%Y-%m-%d")) GROUP BY users.id`;

module.exports = {
  select_operations,
  select_operations_by_id,
  select_operations_by_affectation,
  select_affectation_operations_by_date,
  export_operations,
  select_user_attendances,
};
