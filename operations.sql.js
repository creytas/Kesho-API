const select_operations = `SELECT operation_matieres.id, date_operation, matiere_premieres.libelle_matiere as "matiere", type_operation, qte_operation as "quantite",commentaire_operation as "commentaire", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id`;
const select_operations_by_id = `SELECT operation_matieres.id, date_operation as "Date", matiere_premieres.libelle_matiere as "Matiere", type_operation as "Type opération", qte_operation as "Quantité", operation_matieres.createdAt, operation_matieres.updatedAt, operation_matieres.deletedAt FROM matiere_premieres, operation_matieres WHERE matiere_premieres.id=operation_matieres.matiere_id AND operation_matieres.id=:id`;
module.exports = {
  select_operations,
  select_operations_by_id,
};
